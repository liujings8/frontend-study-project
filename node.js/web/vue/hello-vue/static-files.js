const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');//此处是mz/fs 不是fs

function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        console.log(rpath);
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            if (fs.exists(fp)) {
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;