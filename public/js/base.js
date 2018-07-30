function makeTemplates() {
    var templateName = '';
    $('script[type="text/x-jquery-tmpl"]').each(function(index, item) {
        templateName = $(item).attr("id");
        $.template(templateName.replace("Template", ""), $(item).html());
    });
}

function render(element, template, data, cb) {
    $(element).html('');
    $.tmpl(template, data).appendTo(element);
    if (cb)
        cb($(element))
}



function execute(command, type, request) {
    return new Promise(function(res, rej) {
        executeInternal(appUrl, command, type, request, res, rej, 10000);
    });
}

function executeInternal(url, command, request_path, requestData, success, fail, timeout) {
    fail = ((fail == undefined) ? function() {
        //handle error
    } : fail);

    $.ajax({
        type: request_path,
        url: url + command,
        data: JSON.stringify(requestData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: timeout == undefined ? 300000 : timeout,
        success: success,
        error: fail
    });
}