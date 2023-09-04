import { NewChatIcon } from '@/assets/icon'
import { Drawer } from 'antd'
import { useState } from 'react'
import { NewChatDrawer } from './NewChatDrawer'

export interface INewChatButton {}

export function NewChatButton(props: INewChatButton) {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <button onClick={showDrawer} className="mr-4 h-[37px] w-[37px]">
        <NewChatIcon />
      </button>
      <Drawer
        className="new-chat-drawer"
        title="New messsage"
        placement="right"
        destroyOnClose
        open={open}
      >
        <NewChatDrawer handleClose={onClose} />
      </Drawer>
    </>
  )
}
