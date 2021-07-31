import React, {Component, createRef} from 'react';
import {createPortal} from "react-dom";
import styled from "styled-components/macro";

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			modalOpener: null
		}
		this.modalRef = createRef();
	}

	handleOpen = (e) => {
		this.setState({modalOpener: document.activeElement});
		e.preventDefault();
		this.setState({isOpen: true});
		document.body.style.overflow = 'hidden';
		window.setTimeout(() => this.modalRef.current.focus());
	}

	handleClose = e => {
		this.setState({isOpen: false});
		document.body.style.overflow = 'auto';
		this.state.modalOpener && this.state.modalOpener.focus();
	}

	handleKeyTrap = e => {
		if (!this.modalRef.current) {
			return;
		}

		const focusableNodeList = this.modalRef.current.querySelectorAll("button");
		const shiftKey = e.shiftKey;
		const target = e.target;
		const firstFocusableNode = focusableNodeList[0];
		const lastFocusableNode = focusableNodeList[focusableNodeList.length - 1];
		const isFirstFocusableNode = Object.is(target, firstFocusableNode);
		const isLastFocusableNode = Object.is(target, lastFocusableNode);

		if (shiftKey && isFirstFocusableNode) {
			e.preventDefault();
			lastFocusableNode.focus();
		}
		if (!shiftKey && isLastFocusableNode) {
			e.preventDefault();
			firstFocusableNode.focus();
		}
	}

	keyListenerMap = new Map([
		[27, this.handleClose],
		[9, this.handleKeyTrap]
	]);


	handleKeyListener = e => {
		const listener = this.keyListenerMap.get(e.keyCode);
		typeof listener === "function" && listener(e);
	}

	componentDidMount() {
		window.addEventListener("keydown", this.handleKeyListener);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.handleKeyListener);
	}

	render() {
		const {isOpen} = this.state;
		const {trigger, label, children} = this.props;

		return (
			<>
				{
					typeof trigger === "function" && trigger({ handleOpen: this.handleOpen, isOpen })
				}
				{
					isOpen &&
					createPortal(
						<Wrapper
							hidden={ !isOpen }
						>
							<StyledModal
								ref={this.modalRef}
								tabIndex="-1"
								role="dialog"
								aria-modal="true"
								aria-label={label}
								onClick={this.handleClose}
							>
								<ModalHeader />
								{children}
							</StyledModal>
						</Wrapper>
						,document.body)
				}
			</>
		)
	}
}

export default Modal;


const Wrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: rgba(0,0,0,0.4);
	z-index: 10000;
	
	&[hidden] {
		display: none;
	}
`;

const StyledModal = styled.article`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 40rem;
	background-color: #fff;
`;

const ModalHeader = styled.div`
  height: 40px;
  background-color: #9eadba;
`