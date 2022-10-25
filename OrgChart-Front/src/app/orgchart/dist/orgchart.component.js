"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var OrgchartComponent = /** @class */ (function () {
    function OrgchartComponent(orgService) {
        this.orgService = orgService;
        this.dataset = [];
    }
    OrgchartComponent.prototype.ngOnInit = function () {
        var _this = this;
        var nodeTemplate = function (data) {
            var html = '<div class="card border-primary  ">';
            html += '<div class="card-header"><b>' + data.nodeName + '</b>';
            if (data.count != 0) {
                html += '<h5><span deptcode="' + data.deptCode + '" class="empcount position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style="cursor:zoom-in;border-radius: 50px 50px;min-width:max-content;">';
                html += data.count + '</span></h5>';
            }
            html += '</div></div>';
            return "\n      <div class=\"card border-primary blog_post\">\n      <div class=\"card-header container_card\"><b>" + data.nodeName + "</b><h4><span deptcode=\"" + data.deptCode + "\" \n      class=\"empcount position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary\" style=\"cursor:zoom-in;border-radius: 50px 50px;min-width:max-content;\">\n      <strong>i</strong>\n      </span></h4></div>\n      </div>\n      ";
            return html;
        };
        // ${data.Total}
        var datasource = {};
        this.orgService.getOrgDepartment().subscribe(function (res) {
            // console.log(res);
            res = JSON.parse(JSON.stringify(res).replace(/\s(?=\w+":)/g, ""));
            _this.dataset = res;
            _this.dataset.forEach(function (item, index) {
                if (!item.nodeParent) {
                    delete item.nodeParent;
                    Object.assign(datasource, item);
                }
                else {
                    var jsonloop = new JSONLoop(datasource, 'nodeCode', 'children');
                    jsonloop.findNodeById(datasource, item.nodeParent, function (err, node) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            delete item.nodeParent;
                            if (node.children) {
                                node.children.push(item);
                            }
                            else {
                                node.children = [item];
                            }
                        }
                    });
                }
            });
            var oc = $('#chart-container').orgchart({
                'data': datasource,
                'pan': true,
                'zoom': true,
                'nodeTemplate': nodeTemplate,
                'verticalLevel': 5,
                'visibleLevel': 5,
                'createNode': function ($node, data) {
                    $node.find('span.empcount').on('click', function () {
                        var htmlTable = "\n            <table id=\"empTable\" class=\"table table-hover\">\n           \n            </table>\n            ";
                        $('#empList').html(htmlTable);
                        $.fn.dataTable.ext.errMode = 'none';
                        var empTable = $('#empTable').DataTable({
                            ordering: false,
                            autoWidth: false,
                            responsive: true,
                            odering: true,
                            lengthMenu: [[2, 5, 10, -1], [2, 5, 10, "All"]],
                            ajax: {
                                url: 'https://192.168.2.211/orgchart_api/employeeOrg',
                                // url:'http://192.168.2.129/orgchartapi/employeeOrg',
                                dataType: 'json',
                                type: 'GET',
                                dataSrc: function (json) {
                                    json = JSON.parse(JSON.stringify(json).replace(/\s(?=\w+":)/g, ""));
                                    //data = org , x.dept = employee
                                    var findemp = json.filter(function (x) { return x.deptCode == data.deptCode; });
                                    findemp.sort(function (a, b) {
                                        if (a.positionOrder < b.positionOrder) {
                                            return ((a.positionOrder < b.positionOrder) ? -1 : ((a.positionOrder > b.positionOrder) ? 1 : 0));
                                        }
                                        return 0;
                                    });
                                    return findemp;
                                }
                            },
                            columns: [
                                {
                                    data: "",
                                    title: "",
                                    render: function (data, type, row, meta) {
                                        // ใส่ url ให้มันผิดเพื่อปิดไม่ให้ show รูป
                                        return "\n                              <div class=\"card border-light\">\n                              <div class=\"row g-0\">\n                                <div class=\"col-sm-2\">\n                                  <img src=\"https://apphrbem.com/Profile/imges/BMC_disable" + row.eM_CODE.toString().substring(row.eM_CODE.toString().length - 4) + ".jpg\" class=\"backup_picture img-fluid rounded-start\" onerror=this.src=\"/assets/images/icons8-user-100.png\">\n                                </div>\n                                <div class=\"col-sm-10\">\n                                  <div class=\"card-body\">\n                                    <h5 class=\"card-title\">" + row.thName + ((!!row.eM_NICKNAME) ? ' (' + row.eM_NICKNAME + ')' : '') + "<br/>" + row.engName + "</h5> \n                                    <p class=\"card-text\"><strong class=\"text-muted\"> \u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D : " + ((replacenull(row.telPrimary) != "") ? +row.telPrimary : '') + "  " + ((replacenull(row.telSecondary) != "") ? (',' + row.telSecondary) : '') + "</strong>\n                                    <hr>\n                                    <p class=\"card-text\"><strong class=\"text-muted\">" + ((replacenull(row.positionName) != "") ? ' (' + row.positionName + ')' : '') + "</strong> \n                                    \n                                    </p>\n                                  </div>\n                                </div>\n                              </div>\n                            </div>\n                            ";
                                    }
                                }
                            ]
                        });
                        empTable.columns('PositionOrder').order('asc').draw();
                        $('#deptNameTitle').html(data.nodeName + '<br/>(' + data.nodeNameEn + ')');
                        $('#empModal').modal('show');
                    });
                }
            });
            oc.$chart.find('.node').on('click', function () {
                $('#selected-node').val($(this).find('.card-header b').text());
            });
            $('#btn-report-path').on('click', function () {
                var $selected = $('#chart-container').find('.node.focused');
                if ($selected.length) {
                    $selected.parents('.nodes').children(':has(.focused)').find('.node:first').each(function (index, superior) {
                        if (!$(superior).find('.horizontalEdge:first').closest('table').parent().siblings().is('.hidden')) {
                            $(superior).find('.horizontalEdge:first').trigger('click');
                        }
                    });
                    $(this).prop('disabled', true);
                }
                else {
                    alert('please select the node firstly');
                }
            });
            $('#btn-reset').on('click', function () {
                oc.init({ 'data': datasource });
                oc.$chart.find('.node').on('click', function () {
                    $('#selected-node').val($(this).find('.card-header b').text());
                });
                $('#btn-report-path').prop('disabled', false);
                $('#selected-node').val('');
            });
            $('#btn-export-png').on('click', function () {
                oc["export"]('BEM-OrgChart-' + new Date().toISOString().split('T')[0], 'png');
            });
            $('#btn-export-pdf').on('click', function () {
                oc["export"]('BEM-OrgChart-' + new Date().toISOString().split('T')[0], 'pdf');
            });
        });
        function replacenull(value) {
            return (value === null) ? "" : value;
        }
    };
    OrgchartComponent = __decorate([
        core_1.Component({
            selector: 'app-orgchart',
            templateUrl: './orgchart.component.html',
            styleUrls: ['./orgchart.component.css']
        })
    ], OrgchartComponent);
    return OrgchartComponent;
}());
exports.OrgchartComponent = OrgchartComponent;

//# sourceMappingURL=orgchart.component.js.map
