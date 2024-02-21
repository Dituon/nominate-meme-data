import fsPromise from 'fs/promises'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SEASONS, SEASONS_NAME_MAP } from './spider.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seasons = [...SEASONS_NAME_MAP.values()]

const dirs = fs.readdirSync(__dirname)
    .filter(d => fs.statSync(__dirname + '/' + d).isDirectory())
    .reverse()

const datas = []

for (const dir of dirs) {
    let i = 0
    for (const season of seasons) {
        const file = __dirname + '/' + dir + '/' + season + '.json'
        if (!fs.existsSync(file)) continue
        const {data} = JSON.parse(
            fs.readFileSync(file, 'utf-8')
        )
        const avatar = data[0].avatar
        datas.push({
            name: `${dir}年${SEASONS[i++]}季 日本动画`,
            id: 'bangumi/' + dir + '/' + season,
            avatar,
        })
    }
}

console.log(JSON.stringify(datas))

