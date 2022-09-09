import api from '../api/index'

/**
 * Autentica o usuário
 * 
 * @param {Object} user {nickname: String, password: String}
 * @returns {Promise}
 */
export async function authenticate(user) {
  return await api.post("/user/authenticate", user)
}
