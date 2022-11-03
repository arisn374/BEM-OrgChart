import { Component, OnInit } from '@angular/core';
import { OrgService } from 'src/app/services/orgservice.service';

declare var $: any;
declare var JSONLoop: any;
@Component({
  selector: 'app-orgchart',
  templateUrl: './orgchart.component.html',
  styleUrls: ['./orgchart.component.css']
})
export class OrgchartComponent implements OnInit {

  dataset: OrgDepartment[] = [];
  constructor(private orgService: OrgService) {

  }
  ngOnInit(): void {
    let nodeTemplate = function (data: any) {
      let html = '<div class="card border-primary  ">';
      html += '<div class="card-header"><b>' + data.nodeName + '</b>';
      if (data.count != 0) {
        html += '<h5><span deptcode="' + data.deptCode + '" class=" empcount position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style="cursor:zoom-in;border-radius: 50px 50px;">';
        html += data.count + '</span></h5>';
      }
      html += '</div></div>';
      return `
      <div class="card border-primary blog_post">
      <div class="card-header container_card"><b>${data.nodeName}</b><h4>
      <span deptcode="${data.deptCode}" class="empcount position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
      <label class="info">i</label>
      </span></h4></div>
      </div>
      `;
      return html;
    };
   // ${data.Total}
    let datasource: any = {};

    this.orgService.getOrgDepartment().subscribe((res) => {
      // console.log(res);
      res = JSON.parse(JSON.stringify(res).replace(/\s(?=\w+":)/g, ""));
      this.dataset = <OrgDepartment[]>res;

      this.dataset.forEach(function (item: any, index) {
        if (!item.nodeParent) {
          delete item.nodeParent;
          Object.assign(datasource, item);
        } else {
          var jsonloop = new JSONLoop(datasource, 'nodeCode', 'children');
          jsonloop.findNodeById(datasource, item.nodeParent, function (err: any, node: any) {
            if (err) {
              console.error(err);
            } else {
              delete item.nodeParent;
              if (node.children) {
                node.children.push(item);
              } else {
                node.children = [item];
              }
            }
          });
        }
      });

      let oc = $('#chart-container').orgchart({
        'data': datasource,
        'pan': true,
        'zoom': true,
        'nodeTemplate': nodeTemplate,
        'verticalLevel': 5,
        'visibleLevel': 5,
        'createNode': function ($node: any, data: any) {
          $node.find('span.empcount').on('click', function () {
            let htmlTable = `
            <table id="empTable" class="table table-hover">
           
            </table>
            `;

            $('#empList').html(htmlTable);

            $.fn.dataTable.ext.errMode = 'none';
 
            var empTable = $('#empTable').DataTable({
              ordering: false,
              autoWidth: false,
              responsive: true,
              odering : true,
              lengthMenu: [[2, 5, 10, -1], [2, 5, 10, "All"]],
              ajax: {
              url:'https://inhouse.bemplc.co.th/OrgDevapi/employeeOrg',           
              dataType: 'json',
                type: 'GET',
                dataSrc: function (json: any) {
                  json = JSON.parse(JSON.stringify(json).replace(/\s(?=\w+":)/g, ""));
                  //data = org , x.dept = employee
                  let findemp = json.filter((x: any) => x.deptCode == data.deptCode);
                  findemp.sort(function (a: any, b: any) {
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
                  render: function (data: any, type: any, row: any, meta: any) {
                     
                    // ใส่ url ให้มันผิดเพื่อปิดไม่ให้ show รูป
                    return `
                              <div class="card border-light">
                              <div class="row g-0">
                                <div class="col-sm-2">
                                  <img src="/assets/images/icons8-user-100.png" class="backup_picture img-fluid rounded-start"  >
                                  </div>
                                <div class="col-sm-10">
                                  <div class="card-body">
                                    <h5 class="card-title">${row.thName}${((!!row.eM_NICKNAME) ? ' (' + row.eM_NICKNAME + ')' : '')}<br/>${row.engName}</h5> 
                                    <p class="card-text"><strong class="text-muted"> เบอร์ติดต่อ : ${(replacenull(row.telPrimary) != "") ? + row.telPrimary  : ''}  ${(replacenull(row.telSecondary) != "") ? ( ',' + row.telSecondary ) : ''}</strong>
                                    <hr>
                                    <p class="card-text"><strong class="text-muted">${(replacenull(row.positionName) != "") ? row.positionName : ''} </strong> 
                                    <strong class="text-muted">${(replacenull(row.PositionNameEn) != "" ||  replacenull(row.PositionNameEn) != "undefined" ) ? ' (' + row.PositionNameEn + ')' : ''} </strong> 
                                    
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            `; 
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

      oc.$chart.find('.node').on('click', function (this: any) {
        $('#selected-node').val($(this).find('.card-header b').text());
      });

      $('#btn-report-path').on('click', function (this: any) {
        var $selected = $('#chart-container').find('.node.focused');
        if ($selected.length) {
          $selected.parents('.nodes').children(':has(.focused)').find('.node:first').each(function (index: any, superior: any) {
            if (!$(superior).find('.horizontalEdge:first').closest('table').parent().siblings().is('.hidden')) {
              $(superior).find('.horizontalEdge:first').trigger('click');
            }
          });
          $(this).prop('disabled', true);
        } else {
          alert('please select the node firstly');
        }
      });

      $('#btn-reset').on('click', function () {
        oc.init({ 'data': datasource });
        oc.$chart.find('.node').on('click', function (this: any) {
          $('#selected-node').val($(this).find('.card-header b').text());
        });
        $('#btn-report-path').prop('disabled', false);
        $('#selected-node').val('');
      });

      $('#btn-export-png').on('click', function () {
        oc.export('BEM-OrgChart-' + new Date().toISOString().split('T')[0], 'png');
      });
      $('#btn-export-pdf').on('click', function () {
        oc.export('BEM-OrgChart-' + new Date().toISOString().split('T')[0], 'pdf');
      });
    });

    function replacenull(value: any) {
      return (value === null) ? "" : value;
    }
  }
}


interface OrgDepartment {
  nodeCode: string;
  nodeParent: string;
  nodeName: string;
  nodeNameEn: string;
}


// imgSource : {row.eM_CODE.toString().substring(row.eM_CODE.toString().length - 4)}.jpg" class="backup_picture img-fluid rounded-start" onerror=this.src="/assets/images/icons8-user-100.png">