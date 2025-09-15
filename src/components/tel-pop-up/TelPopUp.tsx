import React, { useCallback, useState } from "react";
import type { FC } from "react";
import { Modal, Button, Typography } from "antd";
import { FiPhone } from "react-icons/fi";
import { useModalNavigation } from "../../hooks/useModalNavigation";

const { Text } = Typography;

const TelPopUp: FC<{ phoneNumber: string }> = ({ phoneNumber = "" }) => {
  console.log(phoneNumber);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsModalOpen(false);
    if (!isBack) window.history.back();
  }, []);
  useModalNavigation(isModalOpen, handleClose);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    !!phoneNumber && (
      <div>
        <Button
          type="text"
          style={{ padding: "0" }}
          onClick={handleOpenModal}
          className="flex items-center gap-2  transition-all"
        >
          <span className="text-base text-text">{phoneNumber?.telFormat()}</span>
          <FiPhone className="text-lg text-text" />
        </Button>

        <Modal
          open={isModalOpen}
          onCancel={() => handleClose()}
          footer={null}
          centered
        >
          <Text className="text-text text-center block">
            <span className="text-xl font-bold">
              {phoneNumber?.telFormat()}
            </span>
          </Text>

          <div className="mt-5 space-y-3">
            <a href={`tel:${phoneNumber}`} className="block">
              <Button type="primary" block>
                <FiPhone className="text-[18px]" />
                <span>Qo'ng'iroq qilish</span>
              </Button>
            </a>
          </div>
        </Modal>
      </div>
    )
  );
};

export default React.memo(TelPopUp);
