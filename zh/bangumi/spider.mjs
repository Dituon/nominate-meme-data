import HTMLParser from 'node-html-parser'
import axios from 'axios'
import { saveMemberData } from "../../index.mjs"
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SEASONS = /** @type {const} */ (['冬', '春', '夏', '秋'])
export const SEASONS_NAME_MAP = new Map(
    /** @type {const} */ (['winter', 'spring', 'summer', 'autumn'])
        .map((k, i) => [SEASONS[i], k])
)

/**
 * 
 * @param {number | string} year
 * @param {typeof SEASONS[number]} season
 */
async function saveBangumi(year, season) {
    const href = encodeURIComponent(`日本${year}年${season}季动画`)
    const url = `https://mzh.moegirl.org.cn/index.php?title=${href}&printable=yes`

    const { data: raw } = await axios.get(url)
    const root = HTMLParser.parse(raw)
    const nodes = [...root.querySelectorAll('.thumb.tright')]

    const data = nodes.map((node, id) => {
        let name = node.previousElementSibling.lastChild.innerText
            .replace('主条目：', '')

        if (name === '简介') {
            name = node.querySelector('.magnify').nextSibling.innerText
        }

        const img = node.querySelector('img')
        if (!img) {
            return false
        }
        return {
            id,
            name,
            avatar: img.getAttribute('src'),
        }
    }).filter(Boolean)

    const title = `${year}年${season}季 最佳日本动画提名`
    
    const items = [
        "最期待的动画",
        "霸权动画",
        "最喜欢的动画",
        "最出圈的动画",
        "最过誉的动画",
        "最被低估的动画",
        "二创最多的动画",
        "争议最大的动画",
        "最佳原创动画",
        "最佳漫改/游戏改动画"
    ]

    fs.mkdir(`${__dirname}/${year}`, { recursive: true })
    const fileName = `${__dirname}/${year}/${SEASONS_NAME_MAP.get(season)}.json`

    await saveMemberData(fileName, {
        title,
        desc: '数据来自 萌娘百科; CC-BY-NC-SA 3.0',
        items,
        data
    })
}

const y = 2024
// saveBangumi(y, '秋')
// saveBangumi(y, '夏')
// saveBangumi(y, '冬')
saveBangumi(y, '夏')