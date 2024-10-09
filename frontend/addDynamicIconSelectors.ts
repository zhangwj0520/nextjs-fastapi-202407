import { writeFileSync } from 'node:fs'
import {
  cleanupSVG,
  importDirectorySync,
  isEmptyColor,
  parseColors,
  runSVGO,
} from '@iconify/tools'
// Import icons from directory 'svg'
const customSet = importDirectorySync('icons', {
  prefix: 'custom',
})
const filePath = 'components/icon'

// Clean up all icons
customSet.forEachSync((name, type) => {
  console.log('name', name)
  if (type !== 'icon') {
    return
  }

  // Get SVG object for icon
  const svg = customSet.toSVG(name)
  if (!svg) {
    // Invalid icon
    customSet.remove(name)
    return
  }

  try {
    // Clean up icon
    cleanupSVG(svg)

    // This is a monotone icon, change color to `currentColor`, add it if missing
    // Skip this step if icons have palette
    parseColors(svg, {
      defaultColor: 'currentColor',
      callback: (attr, colorStr, color) => {
        return !color || isEmptyColor(color)
          ? colorStr
          : 'currentColor'
      },
    })

    // Optimise icon
    runSVGO(svg)
  } catch (err) {
    // Something went wrong when parsing icon: remove it
    console.error(`Error parsing ${name}:`, err)
    customSet.remove(name)
    return
  }

  // Update icon in icon set from SVG object
  customSet.fromSVG(name, svg)
})
const dataSet = customSet.export()
const exported = `${JSON.stringify(dataSet, null, '\t')}\n`
writeFileSync(`${filePath}/output.json`, exported, 'utf8')
export default dataSet
