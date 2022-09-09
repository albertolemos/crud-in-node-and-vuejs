import api from '../api/index'

/**
 * Autentica o usuário
 * 
 * @param {String} oldTtoken {oldToken: String}
 * @returns {Promise}
 */
export async function validate(token) {
  return await api.post("/userAdm/valid-token", token)
}
