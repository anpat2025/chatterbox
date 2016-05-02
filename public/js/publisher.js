
  // Create a client instance
  client = new Paho.MQTT.Client(host, port,"web_" + parseInt(Math.random() * 100, 0)); 
  //Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));
  var topics = [];
var tabs = null;
var tabTitle = null,
retryConnect = 3,
      //tabContent = $( "#tab_content" ),
      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      tabCounter = 2;
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: username,
    password: password,
    onSuccess:onConnect,
    onFailure:doFail
  }

  

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("/cloudmqtt");
    
    message = new Paho.MQTT.Message("echo");
    message.destinationName = "/cloudmqtt";
    client.send(message); 
  }

  function doFail(e){
    console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
      if(retryConnect > 0)
      {
        onConnect();
        retryConnect--;
      }
      
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    if(message.payloadString === "echo")
	    retryConnect = 3;
    else if(message.payloadString === "del")
    {
      alert('Panic!!! Danger please take action');
    }	    
    console.log("onMessageArrived:"+message.payloadString);
  }
  
  // connect the client
  $(document).ready(function() {
      client.connect(options);
        
      ////TAB UI////  
      tabTitle = $( "#txtTopic" ),
      //tabContent = $( "#tab_content" ),
      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      tabCounter = 2;
 
    tabs = $( "#tabs" ).tabs();
 
    // close icon: removing the tab on click
    tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
    
    tabs.bind( "click", function( event ) {
        var panelId = tabs.find( ".ui-tabs-active" ).attr( "aria-controls" );
        //alert(panelId);
    });
 
    tabs.bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        alert(panelId);
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
  });
   
  // actual addTab function: adds new tab using the input from the form above
    function addTab() {
        
        //topics[topics.length - 1] = topic;
        var newGuid = guid();
        var label =  tabTitle.val() || "Tab " + tabCounter,
            id = "tabs_" + newGuid,
            li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
            tabContentHtml = '<textarea id="txtContent_'+ newGuid +'" style="width:100%" rows="10"></textarea><div class="content" id="dvContent_'+ newGuid +'" ></div>';// "Tab " + tabCounter + " content.";
    
        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "' class='box'><p>" + tabContentHtml + "</p></div>" );
        tabs.tabs( "refresh" );
        tabCounter++;
        tabTitle.val('')
    }
  
  function sendMessage()
  {
      var tab = tabs.find( ".ui-tabs-active" );
      //tabs.find( ".ui-tabs-active" ).find(".ui-tabs-anchor").text()
      var contentId = tab.attr( "aria-controls" );
      var topicName = tab.find(".ui-tabs-anchor").text();
      var topic = new Object();
      topic.requestType = "broadcast"
        topic.name = topicName;
        topic.id = contentId;//"tabs-" + tabCounter;
        topic.content = $("#txtContent_" + contentId.split('_')[1]).val();
        var newMessage = JSON.stringify(topic);
        message = new Paho.MQTT.Message(newMessage);
        message.destinationName = "/cloudmqtt";
      client.send(message); 
      
      $("#dvContent_" + contentId.split('_')[1]).append("<p>" + topic.content + "</p>");
      $("#txtContent_" + contentId.split('_')[1]).val('');
  }
  
  function clearTopic()
  {
      var tab = tabs.find( ".ui-tabs-active" );
      //tabs.find( ".ui-tabs-active" ).find(".ui-tabs-anchor").text()
      var contentId = tab.attr( "aria-controls" );
      var topicName = tab.find(".ui-tabs-anchor").text();
      var topic = new Object();
      topic.requestType = "clear"
        topic.name = topicName;
        topic.id = contentId;//"tabs-" + tabCounter;
        //topic.content = $("#txtContent" + contentId.split('-')[1]).val();
        var newMessage = JSON.stringify(topic);
        message = new Paho.MQTT.Message(newMessage);
        message.destinationName = "/cloudmqtt";
      client.send(message); 
      $("#dvContent_" + contentId.split('_')[1]).text('');
  }
  
  function clearAll()
  {
      var tab = tabs.find( ".ui-tabs-active" );
      //tabs.find( ".ui-tabs-active" ).find(".ui-tabs-anchor").text()
     
      var topic = new Object();
      topic.requestType = "clearAll"
        var newMessage = JSON.stringify(topic);
        message = new Paho.MQTT.Message(newMessage);
        message.destinationName = "/cloudmqtt";
      client.send(message); 
      $( "div[id*='dvContent']" ).text('');    
      
  }
  
  
  function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }
