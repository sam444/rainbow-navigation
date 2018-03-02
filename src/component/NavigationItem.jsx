import {Component} from "rainbowui-core";
import PropTypes from 'prop-types';
export default class NavigationItem extends Component {

    renderComponent() {
        return (
           <li className="li-section" id={this.props.sectionId}><a data-href={this.props.sectionId} className={this.props.className}><span className="label">{this.getI18n(this.props.label)}</span></a></li>
        );
    }

};



NavigationItem.propTypes = $.extend({}, Component.propTypes, {
    sectionId: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
});


NavigationItem.defaultProps = $.extend({}, Component.defaultProps, {
});

