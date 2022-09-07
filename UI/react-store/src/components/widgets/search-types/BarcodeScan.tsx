/* eslint-disable */

/**
*==================================================
Copyright [2021] [HCL America, Inc.]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*==================================================
**/
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import barcodeScan from "@iconify/icons-mdi/barcode-scan";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { isChrome, isIOS, isMobile } from "react-device-detect";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
interface barcodeProps {
  setSearchBox(val: any): any;
}
const BarcodeScan: React.FC<barcodeProps> = (props: any) => {
  const [scanning, setScanning] = React.useState<boolean>(false);
  const node: any = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (node.current && !node.current.contains(event.target)) {
      setScanning(false);
    }
  };

  /**Barcode */
  const _scan = () => {
    props.setSearchBox("");
    setOpen(true);
    setScanning(!scanning);
    document.addEventListener("click", handleOutsideClick, false);
  };
  const _onDetected = (err, result) => {
    if (err) {
      console.log("There is an error coming in barcode scanning", err);
    } else {
      props.setSearchBox(result.getText());
      setScanning(!scanning);
      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {isIOS && isChrome ? null : (
        <span ref={node}>
          <span className="icon" onClick={_scan}>
            <Icon icon={barcodeScan} width="20px" height="24px" />
          </span>
        </span>
      )}

      <Modal
        classNames={{ root: "speechToText-dialog" }}
        open={open}
        onClose={handleClose}
        center>
        <BarcodeScannerComponent
          width={isMobile ? 300 : 800}
          height={400}
          onUpdate={(err, result) => _onDetected(err, result)}
        />
        <div className="note">
          Note: Currently we support Code 128, EAN and UPC-A
        </div>
      </Modal>
    </>
  );
};
export default BarcodeScan;
