-- ref: https://github.com/DreamOfIce/fastText.wasm/blob/master/xmake.lua
set_project("fastText")
set_defaultplat("wasm")
add_rules("mode.debug", "mode.release")

target("fastText.browser")
set_kind("binary")
add_files("core/src/*.cc")
add_files("core/webassembly/*.cc")
add_includedirs("core/src")
set_targetdir("$(scriptdir)/src/core")
set_extension(".js")
add_links("embind")
add_ldflags("-sALLOW_MEMORY_GROWTH", "-sEXPORTED_FUNCTIONS=[_malloc,_free]",
    "-sEXPORTED_RUNTIME_METHODS=[addOnPostRun,FS]", "-sFORCE_FILESYSTEM", "-sMODULARIZE", "-sEXPORT_ES6",
    "-sEXPORT_NAME=fastTextModule", "-sWASMFS", "-sNO_INVOKE_RUN", "-sASSERTIONS", "-sASSERTIONS",
    -- ref: https://github.dev/emscripten-core/emscripten/blob/0be5b609412d5b07f8157528df8e5088dae84858/emcc.py#L160
    "-sENVIRONMENT=web,webview,worker", {
        force = true
    })

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
    "-sEXPORT_NAME=fastTextModule", "-sWASMFS", "-sNO_INVOKE_RUN")
