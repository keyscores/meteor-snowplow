Template.home.rendered = function(){
 //Just an ornamental chart for the landing page

  var chart = c3.generate({
    bindto: this.find('.backgroundchart'),
	size: {
		height: 300
	},
      legend: {
        show: false
    },
      axis:{
      	x:{show:false},
      	y:{show:false}
      	},
      tooltip: {
        show: false
       },
      data: {
      	type: "spline",
      	colors: {
            data1: '#ffffff',
            data2: '#ffffff'
        },
       columns: [['data1', 30, 200, 100, 400, 150],['data2', 20, 180, 240, 100, 190]]
      },
      transition: {duration : 2000}

  });

	
};
