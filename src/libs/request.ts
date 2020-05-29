import * as requestPromise from 'request-promise'
import HtmlParser from './html-parser'

namespace Request {
  export const get = (url: string): any => {
    return requestPromise.get(url)
  }

  export const fetchTextFromHtmlPage = async (url: string, htmlSelector: string): Promise<string> => {
    const htmlResponse = await get(url)
    const text = HtmlParser.findElementText(htmlResponse, htmlSelector)
    return text
  }
}

export default Request
