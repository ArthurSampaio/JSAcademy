import md5 from 'md5'

const UtilsService = {
  getCanvasAvatarFromEmail: function(email) {
    const hash = md5(email, { encoding: 'binary' })
    const avatarSrc = `//www.gravatar.com/avatar/${hash}?s=30&d=retro`
    return avatarSrc
  },
}

export default UtilsService
