from PIL import Image
import sys
im = Image.open(sys.argv[1].replace('"',''))
im.save(sys.argv[2].replace('"',''))