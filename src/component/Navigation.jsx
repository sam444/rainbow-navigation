import { Component } from "rainbowui-core";
import "../css/Navigation.css";
import PropTypes from 'prop-types';
export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.scrolling = false;
    }

    renderComponent() {
        return (
            <div id={this.componentId} className="sideNavigation">
                <nav className="cd-vertical-nav">
                    <ul>
                        {this.props.showNavigationBar ? <li className="li-top" id="toolbar-tab-top"><a data-href={this.props.id + " toolbar-tab-top"}><span class="glyphicon glyphicon-chevron-up"></span></a></li> : ''}
                        {this.renderNavigationItem(this)}
                        {this.props.showNavigationBar ? <li className="li-buttom" id="toolbar-tab-bottom"><a data-href={this.props.id + " toolbar-tab-bottom"}><span class="glyphicon glyphicon-chevron-down"></span></a></li> : ''}
                    </ul>
                </nav>
            </div>
        );
    }

    renderNavigationItem(component) {
        if (component.props.children != null) {
            return component.props.children.map(function (children) {
                return children;
            });
        }
    }

    componentDidMount() {
        const self = this;
        let nav = $("#"+this.componentId);
        this.contentSections = $('.card');
        this.verticalNavigation = $('.cd-vertical-nav');
        this.navigationItems = this.verticalNavigation.find('a');
        this.navTrigger = $('.cd-nav-trigger');
        this.scrollArrow = $('.cd-scroll-down');

        $(window).on('scroll', this.checkScroll.bind(this,nav));
        
        //smooth scroll to the selected section
        this.verticalNavigation.on('click', 'a', function (event) {
            event.preventDefault();
            // self.smoothScroll($(this.hash));
            const id = $(this).attr("data-href");
            console.log("id", id)
            if (id == self.props.id + " toolbar-tab-top") {
                $('html,body').animate({ scrollTop: 0 }, 400);
            }
            if (id == self.props.id + " toolbar-tab-bottom") {
                $('html,body').animate({ scrollTop: $(document).height() }, 400);
            }
            let anchorElement = document.getElementById(id);
            if (anchorElement) {
                anchorElement.scrollIntoView();
                window.scrollTo(0, $(window).scrollTop() - 140);
            }
            self.verticalNavigation.removeClass('open');
        });

        //smooth scroll to the second section
        this.scrollArrow.on('click', function (event) {
            event.preventDefault();
            self.smoothScroll($(this.hash));
        });

        // open navigation if user clicks the .cd-nav-trigger - small devices only
        this.navTrigger.on('click', function (event) {
            event.preventDefault();
            self.verticalNavigation.toggleClass('open');
        });
    }

    checkScroll(nav) {
        let _self = this;
        if(!nav.hasClass("navigation-toggle")){
            nav.addClass("navigation-toggle");
            setTimeout(_self.removeNavigationClass.bind(_self,nav),3000);
        }
        
        if (!this.scrolling) {
            this.scrolling = true;
            (!window.requestAnimationFrame) ? setTimeout(this.updateSections.bind(this), 300) : window.requestAnimationFrame(this.updateSections.bind(this));
        }
    }

    removeNavigationClass(nav){
        nav.removeClass("navigation-toggle");
    }

    updateSections() {
        const self = this;
        const halfWindowHeight = $(window).height() / 2,
            scrollTop = $(window).scrollTop();
        this.contentSections.each(function () {
            const section = $(this),
                sectionId = section.attr('id'),
                navigationItem = self.navigationItems.filter('[data-href^="' + sectionId + '"]');
            ((section.offset().top - halfWindowHeight < scrollTop) && (section.offset().top + section.height() - halfWindowHeight > scrollTop))
                ? navigationItem.addClass('active')
                : navigationItem.removeClass('active');
        });
        this.scrolling = false;
    }

    smoothScroll(target) {
        $('body,html').animate(
            { 'scrollTop': target.offset().top },
            300
        );
    }

};


Navigation.propTypes = $.extend({}, Component.propTypes, {
    showNavigationBar: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
});


Navigation.defaultProps = $.extend({}, Component.defaultProps, {
});

