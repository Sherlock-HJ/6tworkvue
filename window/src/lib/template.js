


export default {
    adnet_native:'<div id="cadID"></div>\n' +
           '<script type="text/javascript"> \n' +
           'window.TencentGDT = window.TencentGDT || [];\n' +
           'window.TencentGDT.push({\n' +
           'placement_id: "adID",\n' +
           'app_id: "appID",\n' +
           'type: "native",\n' +
           'count: 3, \n' +
           'onComplete: function(res) {\n' +
           'console.log(res);\n' +
           'if (res && res.constructor === Array) { \n' +
           'window.TencentGDT.NATIVE.renderAd(res[0], "cadID") \n' +
           '        } else {\n' +
           '      setTimeout(function() {\n' +
           '          window.TencentGDT.NATIVE.loadAd("adID")\n' +
           '      }, 3000)\n' +
           '  }\n' +
           '} \n' +
           '});\n' +
           '</script>'
}