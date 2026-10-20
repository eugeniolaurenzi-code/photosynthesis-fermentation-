"""Run only after site is published and URL is verified."""
import sys, qrcode
from urllib.parse import urlparse
if len(sys.argv)!=2:
    raise SystemExit('Uso: python genera_qr.py https://NOME-SITO.netlify.app/')
url=sys.argv[1].strip()
p=urlparse(url)
if p.scheme!='https' or not p.netloc or p.netloc.endswith('example.com'):
    raise SystemExit('Serve un indirizzo HTTPS pubblico definitivo, non un segnaposto.')
qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H,box_size=18,border=4)
qr.add_data(url);qr.make(fit=True)
qr.make_image(fill_color='black',back_color='white').convert('RGB').save('QR_PHOTOSYNTESIS_DEFINITIVO.png')
print('QR creato per:',url)
