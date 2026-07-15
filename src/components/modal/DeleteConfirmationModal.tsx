"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/Dialog"
import Button from "../ui/Button"
import { AlertTriangle, Loader2 } from "lucide-react"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting?: boolean
  lang?: string
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, isDeleting = false, lang = "it" }) => {
  const isIt = lang === "it"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !isDeleting) onClose(); }}>
      <DialogContent className="sm:max-w-md bg-white border border-neutral-200 text-brand-dark p-6">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center text-brand-red mb-3">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <DialogTitle className="font-headline text-xl font-bold text-brand-dark">
            {isIt ? "Elimina Articolo" : "Delete Article"}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center py-2">
          <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
            {isIt
              ? "Sei sicuro di voler eliminare definitivamente questo articolo? Questa azione non può essere annullata."
              : "Are you sure you want to permanently delete this article? This action cannot be undone."}
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4 sm:justify-center w-full">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="w-full sm:w-auto font-bold rounded-lg cursor-pointer"
          >
            {isIt ? "Annulla" : "Cancel"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto font-bold bg-brand-red hover:bg-brand-red/90 text-white rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isIt ? "Elimina" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationModal
