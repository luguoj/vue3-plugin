import {onBeforeUnmount, onMounted} from "vue";

export type ReadState = 'empty' | 'loading' | 'done'
const readStates: ReadState[] = ['empty', 'loading', 'done']

export function useFileReader(options: {
    load?: (result: string | ArrayBuffer | null) => void
    loadStart?: () => void
    loadEnd?: (readState: ReadState, error?: DOMException) => void
    progress?: (loaded: number, total: number) => void
}) {
    let reader: FileReader;
    onMounted(() => {
        reader = new FileReader();
        reader.addEventListener("load", function (e: ProgressEvent<FileReader>) {
            if (e.target) {
                try {
                    options.load && options.load(e.target.result)
                } catch (err) {
                    console.log(err)
                }
            }
        });
        reader.addEventListener('loadstart', function (e: ProgressEvent<FileReader>) {
            if (e.target) {
                try {
                    options.loadStart && options.loadStart()
                } catch (err) {
                    console.log(err)
                }
            }
        })
        reader.addEventListener('loadend', function (e: ProgressEvent<FileReader>) {
            if (e.target) {
                try {
                    options.loadEnd && options.loadEnd(readStates[e.target.readyState], e.target.error ? e.target.error : undefined)
                } catch (err) {
                    console.log(err)
                }
            }
        })
        reader.addEventListener('progress', function (e: ProgressEvent<FileReader>) {
            if (e.target) {
                try {
                    options.progress && options.progress(e.loaded, e.total)
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
    onBeforeUnmount(() => {
        reader.abort()
    })

    function readAsText(blob: Blob, encoding?: string) {
        reader.readAsText(blob, encoding)
    }

    function readAsArrayBuffer(blob: Blob) {
        reader.readAsArrayBuffer(blob)
    }

    return {readAsText, readAsArrayBuffer}
}