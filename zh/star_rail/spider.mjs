import axios from "axios"
import fs from "fs/promises"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2024-2-12

// mihoyo
const URL = 'https://api-static.mihoyo.com/common/blackboard/sr_wiki/v1/home/content/list?app_sn=sr_wiki&channel_id=17'

const { data: raw } = await axios.get(URL)

const rolesData = raw.data.list[0].children[0].list.map(role => {
    const {
        content_id: id,
        icon: avatar,
        title: name,
    } = role
    return {
        id: '' + id,
        name,
        avatar
    }
})

const lightConeData = raw.data.list[0].children[1].list.map(role => {
    const {
        content_id: id,
        icon: avatar,
        title: name,
    } = role
    return {
        id: '' + id,
        name,
        avatar
    }
})

const roleTitle = "星穹铁道 最佳角色提名"

const roleItems = [
    "最没用的",
    "最有用的",
    "最大的",
    "最小的",
    "最烧的",
    "最想鸿儒的",
    "最想被鸿儒的",
    "最被高估的",
    "最被低估的",
    "最富的",
    "最聪明的",
    "最小心眼的",
    "最有潜力的"
]

const lightConeTitle = "星穹铁道 最佳光锥提名"

const lightConeItems = [
    "最没用的",
    "最有用的",
    "最大的",
    "最小的",
    "最烧的",
    "最想鸿儒的",
    "最想被鸿儒的",
    "最被高估的",
    "最被低估的",
    "最富的",
    "最聪明的",
    "最小心眼的",
    "最有潜力的"
]

await fs.writeFile(__dirname + '/roles.json', JSON.stringify({
    title: roleTitle, items: roleItems, data: rolesData
}, null, 2))

await fs.writeFile(__dirname + '/light_cone.json', JSON.stringify({
    title: lightConeTitle, items: lightConeItems, data: lightConeData
}, null, 2))