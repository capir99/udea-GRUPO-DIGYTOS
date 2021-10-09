$(document).ready(function() {
    $('#tbUsuario').DataTable();
} );

$('#tbUsuario').dataTable({
    "paging": true,
    "ordering": true,
    "searching": false,
    "bPaginate": true,
    "bInfo": true,
    "language": {
        "lengthMenu": "_MENU_ Registros por pág",
        "zeroRecords": "Sin coincidencias",
        "infoEmpty": "No hay registros disponibles",
        "info": "Mostrando _START_ a _END_ registros de _TOTAL_ registros",
        "infoFiltered": "(filtrados de _MAX_ registros en total)"
    },
    "bJQueryUI": true,
    "sDom": 'lfrtip'
});