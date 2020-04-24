/**
 * Tab generator
 * Author: Bastien Ho
 * Author URL: https://avecnous.eu/
 */
const $ = window.jQuery;

const js_tab_openTab = function(selector){
 var Target = $('#'+selector);
 var Wrapper = Target.parents('.front-tabs-content');
 var TabRoot = Wrapper.parents('.front-tabed');
 $('.front-tabs-menu-item', Wrapper.parent()).removeClass('active').removeClass('validated');
 $('#tab-'+selector, Wrapper.parent()).parent().addClass('active').prevAll().addClass('validated');
 if(Wrapper.data('fade')){
   $(Wrapper.data('children'), Wrapper).fadeOut(Wrapper.data('fade'));
   Target.fadeIn(Wrapper.data('fade'));
 }
 else{
   $(Wrapper.data('children'), Wrapper).hide();
   Target.show();
 }
 if(TabRoot.attr('data-hide-until-last') !== undefined){
   var stuffToHide = $(TabRoot.attr('data-hide-until-last'), TabRoot);
   if(Target[0].nextSibling){
     stuffToHide.hide();
   }
   else{
     stuffToHide.show();
   }
 }
}

$.fn.createTabs = function(params) {
  if(undefined === params) params = {};
  const childrenSelector = undefined !== params.children ? params.children : 'section';
  const childrenTitle = undefined !== params.childrenTitle ? params.childrenTitle : 'h2';
  const fade = undefined !== params.fade ? params.fade : '500';
  const PrevText = undefined !== params.prevText ? params.prevText : false;
  const NextText = undefined !== params.nextText ? params.nextText : false;
  const HideUntilLast = undefined !== params.hideUntilLast ? params.hideUntilLast : false;
  var Menu = $('<ul class="front-tabs-menu"></ul>');
  var children = $(childrenSelector, $(this));
  $(this).addClass('front-tabed').prepend(Menu);
  if(HideUntilLast){
    $(this).attr('data-hide-until-last', HideUntilLast);
  }
  children.wrapAll('<div class="front-tabs-content" data-children="'+childrenSelector+'" data-fade="'+params.fade+'">').addClass('front-tabs-item').each(function(){
    var TitleNode = $(childrenTitle, $(this)).hide();
    var Title = TitleNode.text();
    var Id = $(this).attr('id');
    if(!Id){
      Id = str_to_slug(Title);
      $(this).attr('id', Id);
    }
    var Item = $('<li class="front-tabs-menu-item"><span class="front-tabs-button front-tabs-link" id="tab-'+Id+'" data-id="tab-'+Id+'">'+TitleNode.html()+'</span></li>');
    Item.appendTo(Menu);
  });

  children.each(function(){
    if(PrevText && NextText){
      var PrevNextNev = $('<div class="front-tabs-nav"></div>');
      $(this).append(PrevNextNev);
      if($(this)[0].previousSibling){
        PrevNextNev.append('<span class="front-tabs-link" data-id="tab-'+$($(this)[0].previousSibling).attr('id')+'">'+PrevText+'</span>');
      }
      if($(this)[0].nextSibling){
        PrevNextNev.append('<span class="front-tabs-link" data-id="tab-'+$($(this)[0].nextSibling).attr('id')+'">'+NextText+'</span>');
      }
    }
  });
  $('.front-tabs-link', $(this)).unbind('click').click(function(){
    js_tab_openTab($(this).attr('data-id').substring(4));
  }).first().trigger('click');
  return $(this);
}