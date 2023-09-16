// Based on https://github.dev/facebookresearch/fastText/blob/166ce2c71a497ff81cb62ec151be5b569e1f1be6/webassembly/fasttext.js
import { fetchFile, getFastTextModule } from './helpers/models'
import { FastTextModel } from './FastTextModel'
import { modelFileInWasmFs, trainFileInWasmFs } from './constants'

import type { Emscripten } from './types/emscripten'
import type {
  FastTextCoreConstructor,
  FastTextModule,
} from './core/fastText.browser'

export class FastText {
  core: FastTextModule
  ft: FastTextCoreConstructor
  fs: Emscripten.FileSystem.FS

  constructor() {
    this.core = getFastTextModule()
    const fastTextModule = getFastTextModule()
    this.ft = new fastTextModule.FastText()
    this.fs = getFastTextModule().FS
  }

  /**
   * loadModel
   *
   * Loads the model file from the specified url, and returns the
   * corresponding `FastTextModel` object.
   */
  async loadModel(url: string) {
    const fastTextNative = this.ft
    const arrayBuffer = await fetchFile(url)
    const byteArray = new Uint8Array(arrayBuffer)
    const FS = getFastTextModule().FS
    await FS.writeFile(modelFileInWasmFs, byteArray)
    fastTextNative.loadModel(modelFileInWasmFs)
    return new FastTextModel(fastTextNative)
  }

  _train(
    url: RequestInfo | URL,
    modelName: string,
    kwargs: Record<string, any> = {},
    callback: (() => void) | null = null,
  ) {
    const fetchFunc = globalThis.fetch || fetch
    const fastTextNative = this.ft

    return new Promise((resolve, reject) => {
      fetchFunc(url)
        .then((response) => {
          return response.arrayBuffer()
        })
        .then((bytes) => {
          const byteArray = new Uint8Array(bytes)
          const FS = getFastTextModule().FS
          FS.writeFile(trainFileInWasmFs, byteArray)
        })
        .then(() => {
          const argsList = [
            'lr',
            'lrUpdateRate',
            'dim',
            'ws',
            'epoch',
            'minCount',
            'minCountLabel',
            'neg',
            'wordNgrams',
            'loss',
            'model',
            'bucket',
            'minn',
            'maxn',
            't',
            'label',
            'verbose',
            'pretrainedVectors',
            'saveOutput',
            'seed',
            'qout',
            'retrain',
            'qnorm',
            'cutoff',
            'dsub',
            'qnorm',
            'autotuneValidationFile',
            'autotuneMetric',
            'autotunePredictions',
            'autotuneDuration',
            'autotuneModelSize',
          ]
          const args = new (getFastTextModule().Args)()
          argsList.forEach((k) => {
            if (k in kwargs) {
              args[k] = kwargs[k]
            }
          })
          args.model = getFastTextModule().ModelName[modelName]
          args.loss =
            'loss' in kwargs ? getFastTextModule().LossName[kwargs.loss] : 'hs'
          args.thread = 1
          args.input = trainFileInWasmFs

          fastTextNative.train(args, callback)

          resolve(new FastTextModel(fastTextNative))
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * trainSupervised
   *
   * Downloads the input file from the specified url, trains a supervised
   * model and returns a `FastTextModel` object.
   */
  trainSupervised(
    /**
     * the url of the input file.
     * The input file must must contain at least one label per line. For an
     * example consult the example datasets which are part of the fastText
     * repository such as the dataset pulled by classification-example.sh.
     */
    url: string,
    /**
     * Downloads the input file from the specified url, trains a supervised
     * model and returns a `FastTextModel` object.
     *
     * train parameters.
     * For example {'lr': 0.5, 'epoch': 5}
     */
    kwargs: Record<string, any> = {},
    /**
     * train callback function
     * `callback` function is called regularly from the train loop:
     * `callback(progress, loss, wordsPerSec, learningRate, eta)`
     */
    callback: (() => void) | null | undefined,
  ) {
    const self = this
    return new Promise((resolve, reject) => {
      self
        ._train(url, 'supervised', kwargs, callback)
        .then((model) => {
          resolve(model)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * trainUnsupervised
   *
   * Downloads the input file from the specified url, trains an unsupervised
   * model and returns a `FastTextModel` object.
   *
   * @param {function}   callback
   *     train callback function
   *     `callback` function is called regularly from the train loop:
   *     `callback(progress, loss, wordsPerSec, learningRate, eta)`
   *
   * @return {Promise}   promise object that resolves to a `FastTextModel`
   *
   */
  trainUnsupervised(
    /**
     * the url of the input file.
     * The input file must not contain any labels or use the specified label
     * prefixunless it is ok for those words to be ignored. For an example
     * consult the dataset pulled by the example script word-vector-example.sh
     * which is part of the fastText repository.
     */
    url: RequestInfo | URL,
    /** Model to be used for unsupervised learning. `cbow` or `skipgram`. */
    modelName: string,
    /**
     * train parameters.
     * For example {'lr': 0.5, 'epoch': 5}
     */
    kwargs = {},
    /**
     * train callback function
     * `callback` function is called regularly from the train loop:
     * `callback(progress, loss, wordsPerSec, learningRate, eta)`
     */
    callback: (() => void) | null | undefined,
  ) {
    const self = this
    return new Promise((resolve, reject) => {
      self
        ._train(url, modelName, kwargs, callback)
        .then((model) => {
          resolve(model)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
