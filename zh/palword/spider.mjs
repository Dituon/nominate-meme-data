import axios from "axios"
import HTMLParser from "node-html-parser"
import fs from "fs/promises"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2024-2-12

// bilibili
const PALS_URL = 'https://wiki.biligame.com/palworld/%E5%B8%95%E9%B2%81%E5%9B%BE%E9%89%B4'

const { data: raw } = await axios.get(PALS_URL)
const root = HTMLParser.parse(raw)
const nodes = [...root.querySelectorAll('td.帕鲁头像.smwtype_txt')]
const data = nodes.map((td, id) => {
    const a = td.firstChild
    const img = a.firstChild
    return {
        id,
        name: a.getAttribute('title'),
        avatar: img.getAttribute('src'),
    }
})

await fs.writeFile(__dirname + '/pals.json', JSON.stringify(data, null, 2))