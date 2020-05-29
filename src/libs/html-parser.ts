import * as cheerio from 'cheerio'

namespace HtmlParser {
  export const findElementText = (html: string, selector: string): string => {
    const $ = cheerio.load(html)
    const htmlElement = $(selector)
    return htmlElement.text()
  }
}

export default HtmlParser
