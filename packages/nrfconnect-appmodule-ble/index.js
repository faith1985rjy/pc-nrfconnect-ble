/* Copyright (c) 2016, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form, except as embedded into a Nordic
 *   Semiconductor ASA integrated circuit in a product or a software update for
 *   such product, must reproduce the above copyright notice, this list of
 *   conditions and the following disclaimer in the documentation and/or other
 *   materials provided with the distribution.
 *
 *   3. Neither the name of Nordic Semiconductor ASA nor the names of its
 *   contributors may be used to endorse or promote products derived from this
 *   software without specific prior written permission.
 *
 *   4. This software, with or without modification, must only be used with a
 *   Nordic Semiconductor ASA integrated circuit.
 *
 *   5. Any software provided in binary form under this license must not be
 *   reverse engineered, decompiled, modified and/or disassembled.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

 'use strict';

let electron = require('electron');
let ipcMain = electron.ipcMain;
let dialog = electron.dialog;
let shell = electron.shell;
let core = require('nrfconnect-core/index');

if (electron.app.isReady()) {
    initBrowserWindow();
} else {
    electron.app.on('ready', function () {
        initBrowserWindow();
    });
}

function initBrowserWindow() {
    const packageJson = require('./package.json');
    const browserWindow = core.createBrowserWindow({
        title: packageJson.config.title,
        url: 'file://' + __dirname + '/index.html',
        icon: __dirname + '/' + packageJson.config.icon,
        menu: true
    });

    browserWindow.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });
}

let filters =  [
    { name: 'nRF Connect Server Setup', extensions: ['ncs', 'json'] },
    { name: 'All Files', extensions: ['*'] },
];

ipcMain.on('save-server-setup', function (event, arg) {
    event.sender.send('save-server-setup-reply',
        dialog.showSaveDialog({ filters: filters, }));
});

ipcMain.on('load-server-setup', function (event, arg) {
    event.sender.send('load-server-setup-reply',
        dialog.showOpenDialog({ filters: filters,
            properties: ['openFile'],
        }));
});

ipcMain.on('choose-file-dialog', function (event, filters) {
    event.sender.send('choose-file-dialog-reply', dialog.showOpenDialog({
        title: 'Choose file',
        filters: filters,
        properties: ['openFile']
    }));
});
