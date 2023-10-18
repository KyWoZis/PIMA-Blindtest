#!/bin/bash
rsync -avz --exclude='vid' --exclude='*.sh' --exclude='.gitkeep' * saes-vin2022@perso3:~/html