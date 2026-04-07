import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiAlertTriangle, FiLogOut, FiX } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { logout } from "../../../../redux/authSlice";
import { useDeleteMyAccountMutation } from "../../../../api/userApi";
import { useSignOutMutation } from "../../../../api/authApi";

export function DangerTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signOut] = useSignOutMutation();
  const [deleteAccount, { isLoading: deleting }] = useDeleteMyAccountMutation();

  const [deleteStep, setDeleteStep] = useState(0);
  const [deleteInput, setDeleteInput] = useState("");
  const CONFIRM_PHRASE = "DELETE MY ACCOUNT";

  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (deleteInput.trim() !== CONFIRM_PHRASE) {
      toast.error(`Please type "${CONFIRM_PHRASE}" exactly to confirm.`);
      return;
    }
    try {
      await deleteAccount().unwrap();
      toast.info("Your account has been deleted. Sorry to see you go.");
      navigate("/");
    } catch (e) {
      toast.error(e?.data?.message || "Failed to delete account.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-background-light dark:bg-surface-alt flex items-center justify-center text-muted dark:text-muted-dark shrink-0">
            <FiLogOut size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-0.5">Sign Out</p>
            <p className="text-xs text-muted dark:text-muted-dark font-body">Sign out from your account on this device.</p>
          </div>
          <button
            onClick={handleSignOut}
            className="shrink-0 px-4 py-2 border border-border dark:border-border-dark rounded-xl text-sm font-body font-semibold text-foreground dark:text-foreground-dark hover:border-primary hover:text-primary transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark border border-red-200 dark:border-red-800/50 rounded-2xl overflow-hidden">
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 shrink-0">
              <MdOutlineDeleteForever size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-1">Delete Account</p>
              <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed">
                This will permanently deactivate your account. Your booking history is retained for providers. This action <strong>cannot be undone</strong>.
              </p>
            </div>
          </div>

          {deleteStep === 0 ? (
            <button
              onClick={() => setDeleteStep(1)}
              className="mt-4 w-full py-2.5 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-body font-semibold text-sm rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              I want to delete my account
            </button>
          ) : null}
        </div>

        {deleteStep >= 1 ? (
          <div className="border-t border-red-100 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10 px-5 py-4">
            <p className="text-xs font-body font-semibold text-red-700 dark:text-red-300 mb-3 flex items-center gap-1.5">
              <FiAlertTriangle size={13} /> Before you go - you will lose:
            </p>
            <ul className="text-xs text-red-600 dark:text-red-400 font-body space-y-1.5 mb-4">
              {[
                "Access to your account",
                "Your loyalty points and referral code",
                "Ability to track ongoing bookings",
                "Access to submit new reviews",
              ].map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <FiX size={11} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            {deleteStep === 1 ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setDeleteStep(0)}
                  className="flex-1 py-2 border border-border dark:border-border-dark rounded-xl text-xs font-body font-semibold text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setDeleteStep(2)}
                  className="flex-1 py-2 bg-red-500 text-white rounded-xl text-xs font-body font-bold hover:bg-red-600 transition-colors"
                >
                  Yes, continue
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {deleteStep === 2 ? (
          <div className="border-t border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10 px-5 py-4">
            <p className="text-xs font-body text-red-700 dark:text-red-300 mb-2">
              Type <span className="font-mono font-bold">{CONFIRM_PHRASE}</span> to confirm:
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder={CONFIRM_PHRASE}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-red-300 dark:border-red-700 bg-white dark:bg-surface-dark text-foreground dark:text-foreground-dark outline-none font-mono mb-3 placeholder:text-red-300 dark:placeholder:text-red-700"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDeleteStep(0);
                  setDeleteInput("");
                }}
                className="flex-1 py-2 border border-border dark:border-border-dark rounded-xl text-xs font-body font-semibold text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting || deleteInput.trim() !== CONFIRM_PHRASE}
                className="flex-1 py-2 bg-red-600 text-white rounded-xl text-xs font-body font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <AiOutlineLoading3Quarters size={12} className="animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <MdOutlineDeleteForever size={13} /> Delete Forever
                  </>
                )}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
