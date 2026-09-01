import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const dirs = ['public/team', 'public/work', 'public/clients']
const maxWidth = 1200
const jpegQuality = 74

const kb = (bytes) => Math.round(bytes / 1024)

let before = 0
let after = 0

for (const dir of dirs) {
  let files
  try {
    files = await readdir(dir)
  } catch {
    continue
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

    const path = join(dir, file)
    // Read into memory first: sharp holds the source file open, which blocks
    // overwriting the same path on Windows.
    const source = await readFile(path)
    const original = source.length
    const image = sharp(source)
    const meta = await image.metadata()

    const pipeline = image.resize({
      width: Math.min(meta.width ?? maxWidth, maxWidth),
      withoutEnlargement: true,
    })

    const output =
      ext === '.png'
        ? await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
        : await pipeline.jpeg({ quality: jpegQuality, mozjpeg: true }).toBuffer()

    before += original

    if (output.length < original) {
      await writeFile(path, output)
      after += output.length
      console.log(`${path}: ${kb(original)} KB -> ${kb(output.length)} KB`)
    } else {
      after += original
      console.log(`${path}: ${kb(original)} KB (kept)`)
    }
  }
}

console.log(`\nTotal: ${kb(before)} KB -> ${kb(after)} KB`)
