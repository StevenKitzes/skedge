import { QRCodeSVG } from 'qrcode.react'
import styles from './QRCode.module.scss'
import scssVars from './QRCode.module.scss'

const qrImageSrc = '/images/skedge-icon-outline.svg'

function QRCode ({
  backColor = '#FFFFFF',
  errorCorrectionLevel = 'H',
  frontColor = scssVars.primary,
  imageSettings = {
    height: 66,
    src: qrImageSrc,
    width: 66,
  },
  marginInModules = 4,
  size = 180,
  value = 'https://skedge.pro'
}) {
  return (
    <div className={styles.container}>
      <QRCodeSVG
        bgColor={backColor}
        fgColor={frontColor}
        imageSettings={imageSettings}
        level={errorCorrectionLevel}
        marginSize={marginInModules}
        renderAs={'svg'}
        size={size}
        value={value}
      />
    </div>
  )
}

export default QRCode
