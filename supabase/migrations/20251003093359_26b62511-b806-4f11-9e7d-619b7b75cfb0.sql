-- Add SELECT policy so users can view their own chats
CREATE POLICY "Users can view their own chats"
ON public.chats
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  OR guest_email IS NOT NULL
);

-- Add SELECT policy so users can view messages in their own chats
CREATE POLICY "Users can view their own chat messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.chats
    WHERE chats.id = chat_messages.chat_id
      AND chats.user_id = auth.uid()
  )
);