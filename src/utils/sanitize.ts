import sanitizeHtml from 'sanitize-html';

const config = {
    // allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
    // allowedAttributes: {
    //   'a': [ 'href' ]
    // },
    allowedIframeHostnames: ['www.youtube.com'],
    allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false
  }


const sanitize=(html:string):string=>{
    return sanitizeHtml(html,config)
}

export default sanitize