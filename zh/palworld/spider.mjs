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

const title = "幻兽帕鲁 最佳帕鲁提名"

const items = [
    "最喜欢的帕鲁",
    "最讨厌的帕鲁",
    "最可爱的帕鲁",
    "最香草的帕鲁",
    "最罕见的帕鲁",
    "最爱偷懒的帕鲁",
    "最佳劳模",
    "最难抓的帕鲁",
    "最美味的帕鲁",
    ""
]

await fs.writeFile(__dirname + '/pals.json', JSON.stringify({
    title, items, data
}, null, 2))