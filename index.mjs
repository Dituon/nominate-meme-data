/// <reference path="types.d.ts"/>

import fs from 'fs/promises'

/**
 * 
 * @function
 * @param {string} path
 * @param {NominateMeme.MemberData} memberData 
 */
export async function saveMemberData(path, memberData) {
    return await fs.writeFile(path, JSON.stringify(memberData, null, 2))
}