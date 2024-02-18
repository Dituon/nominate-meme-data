import axios from "axios"
import HTMLParser from "node-html-parser"
import path from 'path'
import { fileURLToPath } from 'url'
import { saveMemberData } from "../../index.mjs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2024-2-12

// wiki.gg

const BASE_URL = 'https://apexlegends.wiki.gg'

// Legends
const LEGEND_URL = BASE_URL + '/wiki/Legend'

async function saveLegends() {
    const { data: raw } = await axios.get(LEGEND_URL)
    const root = HTMLParser.parse(raw)
    const nodes = [...root.querySelectorAll('.gallery.mw-gallery-nolines>.gallerybox')]
    const data = nodes.map((td, id) => {
        const a = td.querySelector('.gallerytext a')
        const img = td.querySelector('img')
        return {
            id,
            name: a.getAttribute('title'),
            avatar: BASE_URL + img.getAttribute('src'),
        }
    })

    const title = "Apex 最佳传奇提名"

    const items = [
        "最喜欢的传奇",
        "最害怕的传奇",
        "最常用的传奇",
        "最常见的传奇",
        "最佳队友",
        "最唐队友",
        "最香草的传奇",
        "最难用的传奇",
        "最简单的传奇",
    ]

    await saveMemberData(__dirname + '/legends.json', {
        title,
        desc: '数据来自 apexlegends.wiki.gg',
        items,
        data
    })
}

// Weapons
const WEAPON_URL = BASE_URL + '/wiki/Weapon'

async function saveWeapons() {
    const { data: raw } = await axios.get(WEAPON_URL)
    const root = HTMLParser.parse(raw)
    const nodes = [...root.querySelectorAll('.gallery.mw-gallery-nolines>.gallerybox')]
    const data = nodes.map((td, id) => {
        const a = td.querySelector('.gallerytext a')
        const img = td.querySelector('img')
        return {
            id,
            name: a.getAttribute('title'),
            avatar: BASE_URL + img.getAttribute('src'),
        }
    })

    const title = "Apex 最佳传奇提名"

    const items = [
        "最喜欢的武器",
        "最害怕的武器",
        "最常用的武器",
        "最常见的武器",
        "最不想捡到的武器",
        "击杀最多的武器",
        "被击杀最多的武器",
        "最难用的武器",
        "最简单的武器",
        "最常制造的武器",
    ]

    await saveMemberData(__dirname + '/weapons.json', {
        title,
        desc: '数据来自 apexlegends.wiki.gg',
        items,
        data
    })
}

await saveLegends()
await saveWeapons()
