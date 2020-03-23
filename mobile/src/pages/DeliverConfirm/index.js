/* eslint-disable no-nested-ternary */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import Loading from '~/components/Loading';

import {
  Content,
  CameraContent,
  Camera,
  SnapButtonContent,
  SnapButton,
  SnapIcon,
  Preview,
  ButtonsPreviewContent,
  ButtonsPreview,
  ButtonsPreviewIcon,
  // ButtonContent,
  // Button,
} from './styles';

import { refresh } from '~/store/modules/deliveries/actions';

export default function DeliverConfirm({
  route: {
    params: { deliveryId },
  },
  navigation,
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  const [camera, setCamera] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const takePicture = useCallback(async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      camera.resumePreview();

      setImageUri(data.uri);
    }
  }, [camera]);

  const handleUploadImg = useCallback(async () => {
    try {
      setLoading(true);
      const imgData = new FormData();

      imgData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `delivery-confirm_${deliveryId}_${new Date().getTime()}.jpg`,
      });

      await api.post(
        `/deliverymen/${user.id}/deliveries/${deliveryId}/finish`,
        imgData
      );
      setLoading(false);
      navigation.navigate('Dashboard');
      dispatch(refresh());
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Não foi possível confirmar a entrega, verifique sua conexão.'
      );
    }
  }, [deliveryId, dispatch, imageUri, navigation, user.id]);

  return (
    <Background>
      {loading ? (
        <Loading />
      ) : !imageUri ? (
        <Content>
          <CameraContent>
            <Camera
              ref={setCamera}
              captureAudio={false}
              pauseAfterCapture
              autoFocus={Camera.Constants.AutoFocus.on}
              flashMode={Camera.Constants.FlashMode.off}
            >
              <SnapButtonContent>
                <SnapButton onPress={takePicture}>
                  <SnapIcon />
                </SnapButton>
              </SnapButtonContent>
            </Camera>
          </CameraContent>

          {/* <ButtonContent>
            <Button onPress={takePicture}>Confirmar</Button>
          </ButtonContent> */}
        </Content>
      ) : (
        <CameraContent>
          <Preview source={{ uri: imageUri }}>
            <ButtonsPreviewContent>
              <ButtonsPreview onPress={() => setImageUri(null)}>
                <ButtonsPreviewIcon name="close" />
              </ButtonsPreview>
              <ButtonsPreview>
                <ButtonsPreviewIcon name="check" onPress={handleUploadImg} />
              </ButtonsPreview>
            </ButtonsPreviewContent>
          </Preview>
        </CameraContent>
      )}
    </Background>
  );
}

DeliverConfirm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ deliveryId: PropTypes.string.isRequired })
      .isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
