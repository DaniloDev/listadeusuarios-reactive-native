import React from "react";
import { Modal, Animated, View } from "react-native";
import { ModalBackGround, ModalContainer } from './styles'

const ModalUser = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <ModalBackGround>
          <ModalContainer
            style={[{transform: [{scale: scaleValue}]}]}>
            {children}
          </ModalContainer>
        </ModalBackGround>
      </Modal>
    );
  };

  export default ModalUser