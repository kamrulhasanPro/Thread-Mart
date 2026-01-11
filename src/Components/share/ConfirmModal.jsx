import { motion, AnimatePresence } from "framer-motion";
import {
  FiInfo,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const ICON_MAP = {
  info: FiInfo,
  warning: FiAlertTriangle,
  success: FiCheckCircle,
  danger: FiXCircle,
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { scale: 0.85, opacity: 0, y: 30 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: { scale: 0.9, opacity: 0, y: 20 },
};

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  type = "warning", // info | warning | success | danger
  confirmText = "Confirm",
  cancelText = "Cancel",
  primaryColor = "text-primary",
  confirmColor = "bg-primary",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const Icon = ICON_MAP[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="w-full max-w-md rounded-3xl bg-gray-900 text-white shadow-2xl"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Icon */}
            <div className="flex justify-center pt-6">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
              >
                <Icon className={`text-2xl ${primaryColor}`} />
              </motion.div>
            </div>

            {/* Title */}
            <div className="px-6 pt-4 text-center">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>

            {/* Message */}
            <div className="px-6 py-3 text-center text-sm text-gray-300">
              {message}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 px-6 pb-6 pt-4 sm:flex-row justify-center">
              <button
                onClick={onCancel}
                className="rounded-xl bg-gray-700 px-4 py-2 text-sm transition hover:bg-gray-600 cursor-pointer"
              >
                {cancelText}
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className={`rounded-xl px-4 py-2 text-sm font-medium text-white-900 ${confirmColor} cursor-pointer`}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
