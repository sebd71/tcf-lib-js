/**
 * Copyright (c) 2016 Wind River Systems
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var schemas = require('../schemas.js')
var types = schemas.types;
var cmds =  schemas.cmd;

var handle = {title: 'handle', type: 'string'};
var path = {title: 'path', type: 'string'};
var eof = {title: 'eof', type: 'boolean'};

module.exports = {
    name: "FileSystem",
    cmds: [
        {name: "open", args:[types.string, types.string, types.string], results: [types.err, handle]},
        {name: "close", args:[handle], results: [types.err]},
        {name: "read", args:[handle, types.integer, types.integer], results: [types.data, types.err, eof]},
        {name: "write", args:[handle, types.integer, types.data], results: [types.err, types.odata]},
        {name: "stat", args:[types.string], results: [types.err, types.odata]},
        {name: "remove", args:[types.string], results: [types.err, types.odata]},        
        {name: "realpath", args:[path], results: [types.err, path]},        
        {name: "mkdir", args:[types.string, types.string], results: [types.err]},        
        {name: "rmdir", args:[types.string], results: [types.err]},        
        {name: "copy", args:[types.string, types.string, types.string, types.string, types.string], results: [types.err]},        
        {name: "opendir", args:[path], results: [types.err, handle]},        
        {name: "readdir", args:[handle], results: [{title:'entries', type:'array'}, types.err, eof]},        
    ],
    evs: []
};

module.exports.OpenModes = {
    /* File System Open modes */
    TCF_O_READ: 1,
    /* Open the file for reading */
    TCF_O_WRITE: 2,
    /* Open the file for writing */
    TCF_O_APPEND: 4,
    /* Force all writes to append data at the end of the file */
    TCF_O_CREAT: 8,
    /* If this flag is specified, then a new file will be created if one
     * does not already exist (if TCF_O_TRUNC is specified, the new file will
     * be truncated to zero length if it previously exists).
     */
    TCF_O_TRUNC: 16,
    /* Forces an existing file with the same name to be truncated to zero
     * length when creating a file by specifying TCF_O_CREAT.
     * TCF_O_CREAT MUST also be specified if this flag is used.
     */
    TCF_O_EXCL: 32
    /* Causes the request to fail if the named file already exists.
     * TCF_O_CREAT MUST also be specified if this flag is used.
     */
};

module.exports.FileAttrs = {
    /* File System Open modes */
    ATTR_SIZE: 1,
    /* File size is present in the FileAttrs object */
    ATTR_UIDGID: 2,
    /* User ID and Group ID are present in the FileAttrs object */
    ATTR_PERMISSIONS: 4,
    /* The file permissons are present in the FileAttrs object */
    ATTR_ACMODTIME: 8
    /* The access and modification times of the file are present in
       the FileAttrs object
    */
};
