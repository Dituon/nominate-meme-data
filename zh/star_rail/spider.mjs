import axios from "axios"
import fs from "fs/promises"
import path from 'path'
import { fileURLToPath } from 'url'
import HTMLParser from "node-html-parser"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2024-2-13

// bilibili
const ROLES_URL = 'https://wiki.biligame.com/sr/%E8%A7%92%E8%89%B2%E7%AD%9B%E9%80%89'

const { data: rolesRaw } = await axios.get(ROLES_URL)

const rolesNodes = [...HTMLParser.parse(rolesRaw).querySelectorAll('#CardSelectTr tbody>tr')].slice(1)
const rolesData = rolesNodes.map((tr, id) => {
    const td = tr.childNodes[1]
    const a = td.firstChild
    const img = a.firstChild
    return {
        id,
        name: a.getAttribute('title'),
        avatar: convertImageUrl(img.getAttribute('src')),
    }
})

const LIGHT_CONE_URL = 'https://wiki.biligame.com/sr/%E5%85%89%E9%94%A5%E4%B8%80%E8%A7%88'

const { data: lightConeRaw } = await axios.get(LIGHT_CONE_URL)

const lightConeNodes = [...HTMLParser.parse(lightConeRaw).querySelectorAll('#CardSelectTr tbody>tr')].slice(1)
const lightConeData = lightConeNodes.map((tr, id) => {
    const td = tr.childNodes[1]
    const a = td.firstChild
    const img = a.firstChild
    return {
        id,
        name: a.getAttribute('title'),
        avatar: convertImageUrl(img.getAttribute('src')),
    }
})

const roleTitle = "星穹铁道 最佳角色提名"

const roleItems = [
    "最有用的角色",
    "最没用的角色",
    "最被高估的角色",
    "最被低估的角色",
    "最可爱(香草)的角色",
    "最聪明的角色",
    "最小心眼的角色",
    "最有潜力的角色",
]

const lightConeTitle = "星穹铁道 最佳光锥提名"

const lightConeItems = [
    "最有用的光锥",
    "最没用的光锥",
    "最稀有的光锥",
    "最被高估的光锥",
    "最被低估的光锥",
]

await fs.writeFile(__dirname + '/roles.json', JSON.stringify({
    title: roleTitle, items: roleItems, data: rolesData
}, null, 2))

await fs.writeFile(__dirname + '/light_cone.json', JSON.stringify({
    title: lightConeTitle, items: lightConeItems, data: lightConeData
}, null, 2))

function convertImageUrl(inputUrl) {
    const urlParts = inputUrl.split('/');
    const folderPath = urlParts.slice(0, -1).join('/');
    return folderPath.replace('/thumb', '');
}

// 2024-2-12

/*
// mihoyo
const URL = 'https://api-static.mihoyo.com/common/blackboard/sr_wiki/v1/home/content/list?app_sn=sr_wiki&channel_id=17'

const { data: raw } = await axios.get(URL)

const rolesData = raw.data.list[0].children[0].list.map(role => {
    const {
        content_id: id,
        // ext,
        title: name,
        icon: avatar
    } = role
    // const extData = JSON.parse(ext)
    return {
        id: '' + id,
        name,
        avatar
        // avatar: extData.c_18.picture.list[0]
    }
})

const lightConeData = raw.data.list[0].children[1].list.map(role => {
    const {
        content_id: id,
        ext,
        title: name,
    } = role
    const extData = JSON.parse(ext)
    return {
        id: '' + id,
        name,
        avatar: extData.c_19.picture.list[0]
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
 */