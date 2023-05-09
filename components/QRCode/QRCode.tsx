import { QRCodeSVG } from 'qrcode.react'
import styles from './QRCode.module.scss'
import scssVars from './QRCode.module.scss'
import { ReactElement } from 'react'

type QRProps = {
  backColor: string,
  errorCorrectionLevel: string,
  frontColor: string,
  imageSettings: {
    excavate: boolean,
    height: number,
    src: string,
    width: number,
  }
  size: number,
  value: string,
}

const qrImageSrc = '/images/skedge-icon-outline.svg'

function QRCode ({
  backColor = '#FFFFFF',
  errorCorrectionLevel = 'H',
  frontColor = scssVars.primary,
  imageSettings = {
    excavate: false,
    height: 66,
    src: qrImageSrc,
    width: 66,
  },
  size = 180,
  value = 'https://skedge.pro'
}: QRProps): ReactElement {
  return (
    <div className={styles.container}>
      <QRCodeSVG
        bgColor={backColor}
        fgColor={frontColor}
        imageSettings={imageSettings}
        level={errorCorrectionLevel}
        size={size}
        value={value}
      />
    </div>
  )
}

export default QRCode
