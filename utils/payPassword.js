import CryptoJS from 'crypto-js'

// 配置参数
const ITERATIONS = 1000 // 哈希迭代次数
const STORAGE_KEY = 'payPassword' // 本地存储 key

/**
 * 生成随机盐
 */
function generateSalt(length = 6) {
    return Math.random().toString(36).slice(-length)
}

/**
 * 根据密码和盐生成哈希
 * @param {string} password 用户输入密码
 * @param {string} salt 盐值
 */
function hashPassword(password, salt) {
    let hash = password
    for (let i = 0; i < ITERATIONS; i++) {
        hash = CryptoJS.SHA256(hash + salt).toString()
    }
    return hash
}

/**
 * 设置支付密码
 * @param {string} password 用户输入的支付密码
 */
export function setPayPassword(password) {
    const salt = generateSalt()
    const hash = hashPassword(password, salt)

    uni.setStorageSync(STORAGE_KEY, { salt, hash })
    return true
}

/**
 * 校验支付密码
 * @param {string} password 用户输入的密码
 * @returns {boolean} 是否正确
 */
export function verifyPayPassword(password) {
    const stored = uni.getStorageSync(STORAGE_KEY)
    if (!stored) return false

    const { salt, hash: storedHash } = stored
    const hash = hashPassword(password, salt)
    return hash === storedHash
}

/**
 * 修改支付密码
 * @param {string} oldPassword 旧密码
 * @param {string} newPassword 新密码
 */
export function changePayPassword(oldPassword, newPassword) {
    if (!verifyPayPassword(oldPassword)) return false
    return setPayPassword(newPassword)
}

/**
 * 是否已设置支付密码
 */
export function hasPayPassword() {
    return !!uni.getStorageSync(STORAGE_KEY)
}
