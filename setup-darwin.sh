sudo npm install -g npm
sudo npm install -g node-gyp
sudo npm install -g electron-packager
sudo npm install -g flatten-packages
sudo npm install -g less

export npm_config_runtime=electron
export npm_config_target=0.30.3
export npm_config_arch=x64

export DEPLOY_DIR=../yggdrasil-deploy

npm install --production

flatten-packages
lessc ./css/styles.less ./css/styles.css
electron-packager ./ yggdrasil --platform=darwin --arch=x64 --version=0.30.3 --overwrite --out=$DEPLOY_DIR --icon=nordic_logo.icns --app-version=0.7.0 --version-string.CompanyName="Nordic Semiconductor" --version-string.LegalCopyright = "LegalCopyright" --version-string.FileDescription = "FileDescription" --version-string.OriginalFilename = "OriginalFilename" --version-string.FileVersion = "FileVersion" --version-string.ProductVersion = "ProductVersion" --version-string.ProductName = "ProductName" --version-string.InternalName = "InternalName"

cp yggdrasil_installer.nsi $DEPLOY_DIR

cd ..


