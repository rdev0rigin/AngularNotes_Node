'------------------------------------------------------------------------------
' <auto-generated>
'     This code was generated from a template.
'
'     Manual changes to this file may cause unexpected behavior in your application.
'     Manual changes to this file will be overwritten if the code is regenerated.
' </auto-generated>
'------------------------------------------------------------------------------

Imports System
Imports System.Collections.Generic

Partial Public Class Quote
	<ComponentModel.DataAnnotations.Key>
	Public Property ID As Integer
	Public Property [Date] As Date
	Public Property Name As String

	Public Overridable Property Company As Company
	Public Overridable Property Lines As ICollection(Of QuoteLine) = New HashSet(Of QuoteLine)

End Class
