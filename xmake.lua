-- ref: https://github.com/DreamOfIce/fastText.wasm/blob/master/xmake.lua
set_project("fastText")
set_defaultplat("wasm")
add_rules("mode.debug", "mode.release")

-- non Node ENVIRONMENT binding js do not import "module"
target("fastText.common")
set_kind("binary")
add_files("core/src/*.cc")
add_files("core/webassembly/*.cc")
add_includedirs("core/src")
set_targetdir("$(scriptdir)/src/core")
set_extension(".js")
add_links("embind")
-- warning: add_ldflags("-sEMBIND_AOT") is ignored, please pass `{force = true}` or call `set_policy("check.auto_ignore_flags", false)` if you want to set it.
set_policy("check.auto_ignore_flags", false)
add_ldflags("-sALLOW_MEMORY_GROWTH", "-sEXPORTED_FUNCTIONS=[_malloc,_free]",
    -- import.meta.url could not ensure others bundler resolve correctly
    "-sEXPORT_ES6", "-sUSE_ES6_IMPORT_META=0",
    "-sEXPORTED_RUNTIME_METHODS=[addOnPostRun,FS]", "-sFORCE_FILESYSTEM", "-sMODULARIZE",
    "-sEXPORT_NAME=fastTextModule", "-sWASMFS", "-sNO_INVOKE_RUN", "-sASSERTIONS",
    -- ref: https://github.dev/emscripten-core/emscripten/blob/0be5b609412d5b07f8157528df8e5088dae84858/emcc.py#L160
    -- Except node and shell env
    "-sENVIRONMENT=web,webview,worker",
    -- ref: https://github.com/emscripten-core/emscripten/issues/20994#issuecomment-1875655395
    "-sDYNAMIC_EXECUTION=0", "-sEMBIND_AOT"
  )

-- If make target ENVIRONMENT=node, it will `import { createRequire } from 'module'`,
-- without specific ENVIRONMENT, use dynamic `import('module')` instead.
target("fastText.node")
set_kind("binary")
add_files("core/src/*.cc")
add_files("core/webassembly/*.cc")
add_includedirs("core/src")
set_targetdir("$(scriptdir)/src/core")
set_extension(".js")
add_links("embind")
add_ldflags("-sALLOW_MEMORY_GROWTH", "-sEXPORTED_FUNCTIONS=[_malloc,_free]",
    "-sEXPORTED_RUNTIME_METHODS=[addOnPostRun,FS]", "-sFORCE_FILESYSTEM", "-sMODULARIZE", "-sEXPORT_ES6",
    "-sEXPORT_NAME=fastTextModule", "-sWASMFS", "-sNO_INVOKE_RUN"
  )
