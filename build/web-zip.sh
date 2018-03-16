#!/bin/bash

DEST_PATH=$1;
MODULE_NAME=$2;
MODULE_ID=$3;
MODULE_NAME_TEMP=${MODULE_NAME}_temp;
echo "dest path:${DEST_PATH} module name:${MODULE_NAME} id:${MODULE_ID}";

pushd ${DEST_PATH};
cd ..;
cp -R ${MODULE_NAME} ${MODULE_NAME_TEMP};
find ./${MODULE_NAME_TEMP} -name '*.map' -type file -exec rm {} \;
find ./${MODULE_NAME_TEMP} -name '*.DS_Store' -type file -exec rm {} \;
cd ${MODULE_NAME_TEMP};
zip -r ${DEST_PATH}/app-${MODULE_ID}.zip ".";
cd ..;
rm -rf ${MODULE_NAME_TEMP};
popd;
