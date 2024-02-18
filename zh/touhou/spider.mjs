import axios from "axios"
import HTMLParser from "node-html-parser"
import { saveMemberData } from "../../index.mjs"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2024-2-18

// THB Wiki

async function saveRoles() {
    const URL = 'https://thwiki.cc/%E5%AE%98%E6%96%B9%E8%A7%92%E8%89%B2%E5%88%97%E8%A1%A8'

    const FILTERS = ['正作游戏', '外传游戏', '出版物']
    const NO_AVATAR_KEYWORD = encodeURI('无立绘')
    
    const { data: raw } = await axios.get(URL)
    const root = HTMLParser.parse(raw)
    const nodes = [...root.querySelectorAll('.chara-item.chara-sub.chara-hide')]
    const data = nodes.map((node, id) => {
        if (!FILTERS.includes(node.getAttribute('data-tag'))) {
            return false
        }
        
        let avatar = node.querySelector('img').getAttribute('v-lazy').slice(1, -1)
        if (avatar.includes(NO_AVATAR_KEYWORD)) {
            return false
        }
        avatar = avatar.split('/').slice(0, -1).join('/')
        return {
            id,
            name: node.getAttribute('data-chara'),
            avatar,
        }
    }).filter(Boolean)
    
    const title = "东方Project 最佳角色提名"
    
    const items = [
        "最可爱的角色",
        "最活跃的角色",
        "人气最高的角色",
        "最出圈的角色",
        "最温柔的角色",
        "最适合结婚的角色",
        "订阅二创最多的角色",
        "最符合性癖的角色",
        "最S的角色",
        "最M的角色"
    ]
    
    await saveMemberData(__dirname + '/roles.json', {
        title,
        desc: '数据来自 THB Wiki; 不包含旧作角色\n部分立绘为 @忍忍_ninnin 所作',
        items,
        data
    })
}

async function saveGames() {
    const URL = 'https://thwiki.cc/%E5%AE%98%E6%96%B9%E6%B8%B8%E6%88%8F'

    const EXCLUDES = ['TH01', 'TH02', 'TH03', 'TH04', 'TH05', '无']
    
    const { data: raw } = await axios.get(URL)
    const root = HTMLParser.parse(raw)
    const nodes = [...root.querySelectorAll('td[rowspan="3"]')]
    const data = nodes.map((node) => {
        let avatar = node.querySelector('img').getAttribute('src')
        avatar = avatar.split('/').slice(0, -1).join('/')

        const parent = node.parentNode
        const id = parent.childNodes[1].textContent

        if (EXCLUDES.includes(id)) return false

        const name = parent.childNodes[2].querySelector('a').textContent

        return {
            id,
            name,
            avatar,
        }
    }).filter(Boolean)
    
    const title = "东方Project 最佳游戏提名"
    
    const items = [
        "入坑作",
        "最困难的游戏",
        "最简单的游戏",
        "人气最高的游戏",
        "最出圈的游戏",
        "游戏性最高的游戏",
        "音乐最动听的游戏",
        "会推荐给新人的游戏",
        "好评如潮",
        "",
    ]
    
    await saveMemberData(__dirname + '/games.json', {
        title,
        desc: '数据来自 THB Wiki; 不包含旧作',
        items,
        data
    })
}

await saveRoles()
await saveGames()
