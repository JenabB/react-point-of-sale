import { Button, Empty } from "antd";
import React, { useState } from "react";
import ShopCreateModal from "./ShopCreateModal";

const EmptyShop: React.FC = () => {
  const [isCreate, setIsCreate] = useState(false);

  const handleCreate = () => setIsCreate(!isCreate);

  return (
    <>
      <ShopCreateModal isOpen={isCreate} onClose={handleCreate} />
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={<span>No Shop yet</span>}
      >
        <Button type="primary" onClick={handleCreate}>
          Create One
        </Button>
      </Empty>
    </>
  );
};

export default EmptyShop;
